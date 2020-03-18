SELECT Claim_Order_Places.[Id]
      ,[Place_types].Name as place_type_name
		,Place_types.Id as place_type_id
     ,[Districts].Name as districts_name
		,[Districts].Id as districts_id
    ,[Places].[Name] as places_name
		,Places.Id as places_id
	  ,concat(
		case when Flats.Number is null then Flats.Number else Flats.Number end,
		case when Flats.Letter is null then Flats.Letter else ' '+ Flats.Letter end
	  ) as flats
		, Flats.Id as flats_id
	  ,[Claim_Order_Places].[Is_first_place]
      ,[Claim_Order_Places].[Is_demage_place]
      ,[Claim_Order_Places].[Demage_place_description]
      ,[Claim_Order_Places].[Lattitude]
      ,[Claim_Order_Places].[Longitude]
  FROM [dbo].Claim_Order_Places --[Places]
  	left join Places on Claim_Order_Places.Place_ID = Places.Id
	left join Place_types on Place_types.Id = Places.Place_type_ID
	left join Claims on Claims.Id = Claim_Order_Places.Claim_ID
	left join Streets on Streets.Id = Places.Street_id
	left join Districts on Districts.Id = Places.District_ID
	left join Houses on Houses.Id = Places.Relation_obj_ID
	left join Flats on Flats.Id = Claim_Order_Places.Flats_ID
	where [Claim_Order_Places].[Id] = @Id