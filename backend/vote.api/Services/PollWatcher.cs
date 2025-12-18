
using System.Numerics;
using Microsoft.AspNetCore.SignalR;
using Nethereum.Hex.HexTypes;
using Nethereum.RPC.Eth.DTOs;
using Nethereum.Web3;
using vote.api.Dtos;
using vote.api.Hubs;

namespace vote.api.Services;

public class PollWatcher : BackgroundService
{
    private readonly string _contractAddress = "0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35";

    private readonly string _rpcUrl = "http://127.0.0.1:8545";
    private readonly IHubContext<ChatHub> _hubContext;

    public PollWatcher(IHubContext<ChatHub> hubContext)
    {
        _hubContext = hubContext;
    }
    protected async override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // try
        // {
        //     var blockNo = await web3.Eth.Blocks.GetBlockNumber.SendRequestAsync();
        //     System.Console.WriteLine($"BlockNumber: {blockNo.Value}");
        // }
        // catch (System.Exception)
        // {
        //     System.Console.WriteLine("Couldnt get block number...");
        //     return;
        // }
        var web3 = new Web3(_rpcUrl);
        var eventHandler = web3.Eth.GetEvent<PollCreatedEventDto>(_contractAddress);

        HexBigInteger lastBlock = await web3.Eth.Blocks.GetBlockNumber.SendRequestAsync();


        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var latestBlock =
                    await web3.Eth.Blocks.GetBlockNumber.SendRequestAsync();

                if (latestBlock.Value > lastBlock.Value)
                {
                    var filter = eventHandler.CreateFilterInput(
                        new BlockParameter(new HexBigInteger(lastBlock.Value + 1)),
                        new BlockParameter(latestBlock)
                    );

                    var changes = await eventHandler.GetAllChangesAsync(filter);

                    foreach (var log in changes)
                    {
                        var poll = log.Event;

                        Console.WriteLine($"New poll: {poll.PollTitle}");

                        await _hubContext.Clients.All.SendAsync(
                            "NewPollReceived",
                            poll
                        );
                    }

                    lastBlock = latestBlock;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Watcher error: {ex}");
            }

            await Task.Delay(5000, stoppingToken);
        }

    }
}