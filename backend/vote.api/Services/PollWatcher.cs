
using System.Collections.Concurrent;
using System.Numerics;
using Microsoft.AspNetCore.SignalR;
using Nethereum.Contracts;
using Nethereum.Hex.HexTypes;
using Nethereum.RPC.Eth.DTOs;
using Nethereum.Web3;
using vote.api.Dtos;
using vote.api.Hubs;
using vote.api.Models;

namespace vote.api.Services;

public class PollWatcher : BackgroundService
{
    private readonly string _contractAddress = "0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35";

    private readonly string _rpcUrl = "http://127.0.0.1:8545";
    private readonly IHubContext<ChatHub> _hubContext;
    private readonly ConcurrentDictionary<string, PollData> _polls = new();



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
        var pollCreated = web3.Eth.GetEvent<PollCreatedEventDto>(_contractAddress);
        // Event<NewVoteEventDto> newVoteEvent = web3.Eth.GetEvent<NewVoteEventDto>();


        

        HexBigInteger lastBlock = await web3.Eth.Blocks.GetBlockNumber.SendRequestAsync();


        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var latestBlock =
                    await web3.Eth.Blocks.GetBlockNumber.SendRequestAsync();

                if (latestBlock.Value > lastBlock.Value)
                {
                    var filter = pollCreated.CreateFilterInput(
                        new BlockParameter(new HexBigInteger(lastBlock.Value + 1)),
                        new BlockParameter(latestBlock)
                    );

                    var changes = await pollCreated.GetAllChangesAsync(filter);

                    foreach (var log in changes)
                    {
                        var poll = log.Event;
                        _polls[poll.PollAddres] = new PollData{
                            Title = poll.PollTitle, 
                            CreatedBy = poll.CreatedBy, 
                            VoteCount = 0
                            };
                        
                        Console.WriteLine($"New poll: {poll.PollTitle}");

                        await _hubContext.Clients.All.SendAsync(
                            "NewPollReceived",
                            poll
                        );
                    }

                    foreach(var key in _polls.Keys)
                    {

                        var newVoteEvent = web3.Eth.GetEvent<NewVoteEventDto>(key);
                        System.Console.WriteLine($"Address: {key}");
                        var voteFilter = newVoteEvent.CreateFilterInput(
                            new BlockParameter(new HexBigInteger(lastBlock.Value + 1)),
                            new BlockParameter(latestBlock)
                        );
    
                        var voteChanges = await newVoteEvent.GetAllChangesAsync(voteFilter);
                        foreach(var log in voteChanges)
                        {
                        System.Console.WriteLine($"VoteCount {_polls[key].VoteCount}");
                        System.Console.WriteLine($"VoteCount {log.Event}");
                            await _hubContext.Clients.All.SendAsync("NewVoteReceived", new 
                            {
                                log.Event.OptionTitle,
                                VoteCount = log.Event.VoteCount.ToString()
                            });
                        }
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