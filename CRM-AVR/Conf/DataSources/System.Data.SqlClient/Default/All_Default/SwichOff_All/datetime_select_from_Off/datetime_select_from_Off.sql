select 
    Faucet.Id,
    --  concat('Д.: ' + ltrim(Diameters.Size), + ', ' + Places.Name, + ', дата: ' + ltrim(convert(datetime, start_from, 120)) ) as Start_from
    -- concat('Д.: ' + ltrim(Diameters.Size), + ', ' + Places.Name, + ', дата: ' + ltrim(CONVERT(datetime2(0), Faucet.Start_from, 126)) ) as Start_from
    concat('Д.: ' + ltrim(Diameters.Size), + ', ' + Places.Name, + ', дата: ' + ltrim(CONVERT(datetime2(0), DATEADD(second, -DATEDIFF(second, GETDATE(), GETUTCDATE()), Faucet.Start_from), 126)) ) as Start_from
from Faucet
	left join Diameters on Diameters.Id = Faucet.Diametr_Id
	left join Places on Places.Id = Faucet.Place_Id
	where Claim_Id = @claim_id
	and Action_types_Id in (231, 48, 232, 151)
	and Faucet.Finish_at is null
    and
         #filter_columns#
         #sort_columns#
    offset @pageOffsetRows rows fetch next @pageLimitRows rows only



/*
select 
    Faucet.Id
    ,convert(smalldatetime , Faucet.Start_from, 20 )  as Start_from
    -- ,Faucet.Start_from
from Faucet
	where Claim_Id = @claim_id
	and Action_types_Id in (231, 48, 232, 151)
    and
         #filter_columns#
         #sort_columns#
    offset @pageOffsetRows rows fetch next @pageLimitRows rows only
 */