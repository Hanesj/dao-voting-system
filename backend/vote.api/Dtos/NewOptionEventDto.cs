using Nethereum.ABI.FunctionEncoding.Attributes;

namespace vote.api.Dtos;

[Event("optionAdded")]
public record NewOptionEventDto : IEventDTO
{
    [Parameter("string", "optionTitle", 1, false)]
    public string OptionTitle {get; set;}
    
    [Parameter("address", "suggester", 2, false)]
    public string Suggester {get; set;}
}