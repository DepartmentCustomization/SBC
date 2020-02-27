SELECT 
	   row_number() over (order by (select 1)) as num
	  ,Organizations.Name as organizations_name
      ,[Claims].[Claim_Number]
	  ,Places.Name as places_name
      ,[Claims].[Created_at]
      ,[Claims].[Fact_finish_at]
	  ,Claim_types.Name as types_name
	  ,Claims.Id as claims_id
FROM [dbo].[Claims]
  left join Organizations on Organizations.Id = Response_organization_ID
  left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
  left join Places on Places.Id = Claim_Order_Places.Place_ID
  left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
where Organizations.Is_WC = 1 
	and Status_ID in (5,6)
	and Claim_Order_Places.Is_first_place = 1
	and [Claims].[Created_at] >= @dateStart
	and [Claims].[Fact_finish_at] < @dateFinish
	and Organizations.Id = @OrgId



/*SELECT [Claims].[Id]
	  ,Organizations.Name as organizations_name
      ,[Claims].[Claim_Number]
	  ,Places.Name as places_name
      ,[Claims].[Created_at]
      ,[Claims].[Fact_finish_at]
FROM [dbo].[Claims]
  left join Organizations on Organizations.Id = Response_organization_ID
  left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
  left join Places on Places.Id = Claim_Order_Places.Place_ID
where Organizations.Is_WC = 1 
	and Status_ID in (5,6)
	and Claim_Order_Places.Is_first_place = 1
	and [Claims].[Created_at] >= @dateStart
	and [Claims].[Fact_finish_at] < @dateFinish
	and Organizations.Id = @OrgId*/