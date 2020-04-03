insert into [dbo].[Claim_links]
    (
     Claim1_ID
    ,Claim2_ID
    ,Claim_link_type_id
    )
output [inserted].[Id]
values
    (
     @claims_Id
    ,@claims_number2
    ,@claim_link_types_id
    )