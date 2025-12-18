using Nethereum.ABI.FunctionEncoding.Attributes;

namespace vote.api.Dtos;

[Event("pollCreated")]
public record PollCreatedEventDto : IEventDTO
{
    [Parameter("address", "pollAddress", 1, false)]
    public string PollAddres { get; set; }

    [Parameter("string", "title", 2, false)]
    public string PollTitle { get; set; }

    [Parameter("address", "createdBy", 3, false)]
    public string CreatedBy { get; set; }
}