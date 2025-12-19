using System.Numerics;
using Nethereum.ABI.FunctionEncoding.Attributes;

namespace vote.api.Dtos;
[Event("newVote")]
public record NewVoteEventDto : IEventDTO
{
    [Parameter("string","optionTitle", 1, false)]
    public string OptionTitle {get; set;}
    
    [Parameter("uint256","voteCount", 2, false)]
    public BigInteger VoteCount {get; set;}
}