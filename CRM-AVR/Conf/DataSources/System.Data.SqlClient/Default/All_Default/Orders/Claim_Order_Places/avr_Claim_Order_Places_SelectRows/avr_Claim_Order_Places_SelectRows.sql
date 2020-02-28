
select * from (
SELECT 
        Claim_Order_Places.Id
      ,[Place_types].Name as place_type_name
      ,[Districts].Name as districts_name
      ,[Places].[Name] as place_name
	  ,concat(
		case when Flats.Number is null then Flats.Number else Flats.Number end,
		case when Flats.Letter is null then Flats.Letter else ' '+ Flats.Letter end
	  ) as flats
	  , N'головне місце' as att_place
  FROM [dbo].Claim_Order_Places
  	left join Places on Claim_Order_Places.Place_ID = Places.Id
	left join Place_types on Place_types.Id = Places.Place_type_ID
	left join Districts on Districts.Id = Places.District_ID
	left join Flats on Flats.Id = Claim_Order_Places.Flats_ID
	where Claim_Order_Places.Claim_ID = @Id
	and Is_first_place = 1
	
	union 

	SELECT 
        Claim_Order_Places.Id
      ,[Place_types].Name as place_type_name
      ,[Districts].Name as districts_name
      ,[Places].[Name] as place_name
	  ,concat(
		case when Flats.Number is null then Flats.Number else Flats.Number end,
		case when Flats.Letter is null then Flats.Letter else ' '+ Flats.Letter end
	  ) as flats
	  ,case when Claim_Order_Places.Is_demage_place = 1 then N'місце пошкодження'
		else ' ' end as att_place
  FROM [dbo].Claim_Order_Places
  	left join Places on Claim_Order_Places.Place_ID = Places.Id
	left join Place_types on Place_types.Id = Places.Place_type_ID
	left join Districts on Districts.Id = Places.District_ID
	left join Flats on Flats.Id = Claim_Order_Places.Flats_ID
	where Claim_Order_Places.Claim_ID = @Id
	and Claim_Order_Places.Is_first_place <> 1
	and Claim_Order_Places.Place_ID <> (
		select Place_ID from Claim_Order_Places where Claim_ID = @Id and  Is_first_place = 1)
	) as t
	where
	#filter_columns#
	 order by att_place desc
   --  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
	
/*
SELECT distinct -- [Claim_Order_Places].[Id]
      [Place_types].Name as place_type_name
      ,[Districts].Name as districts_name
      ,[Places].[Name] as place_name
	  ,concat(
		case when Flats.Number is null then Flats.Number else Flats.Number end,
		case when Flats.Letter is null then Flats.Letter else ' '+ Flats.Letter end
	  ) as flats
	  ,case when Claim_Order_Places.Is_first_place = 1 then 'головне місце'
		when Claim_Order_Places.Is_demage_place = 1 then 'місце пошкодження'
		else ' ' end as att_place
  FROM [dbo].Claim_Order_Places
  	left join Places on Claim_Order_Places.Place_ID = Places.Id
	left join Place_types on Place_types.Id = Places.Place_type_ID
	left join Districts on Districts.Id = Places.District_ID
	left join Flats on Flats.Id = Claim_Order_Places.Flats_ID
	where Claim_Order_Places.Claim_ID = @Id
-- 	and Claim_Order_Places.Place_ID not in ( select Place_ID from Claim_Order_Places where Claim_Order_Places.Claim_ID = @Id and Orders_ID is not null )
	and 
	 #filter_columns#
	 order by att_place desc
   --  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only

*/
