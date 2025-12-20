
using Nethereum.ABI.FunctionEncoding.Attributes;

namespace vote.api.Dtos;

[Event("votingStarted")]
public record VotingOpenedDto : IEventDTO
{
    [Parameter("string", "pollTitle", 1, false)]
    public string PollTitle {get; set;}
    
}