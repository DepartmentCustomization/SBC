
SELECT [Places].[Id]
	  ,Place_types.Name as place_types_name
	  ,Place_types.Id as place_types_id
	  ,Districts.Name as distincts_name
	  ,Districts.Id as distincts_id
	  ,Houses.Id as streets_id
	  ,Houses.Name as streets_name

    
	  ,str1.Name as cross_str_name1
	  , str1.Street_id as cross_str_id1
	  ,str2.Name as cross_str_name2
	  ,str2.Street_id as cross_str_id2
        
	  ,Places.Lattitude as Latitude
	  ,Places.Longitude
	  
	  ,CrossSTR.Name as cross_name
	    ,CrossSTR.Id as cross_id
	    
	   ,Area_House.Id as area_id
	   ,Area_House.Name as area_name

  FROM [dbo].[Places]
	left join Place_types on Place_types.Id = Places.Place_type_ID
	left join Districts on Districts.Id = Places.District_ID
	
	left join CrossSTR on CrossSTR.Id = Places.Cross_id
	left join Streets str1 on str1.Street_id = CrossSTR.Streets_1_ID
	left join Streets str2 on str2.Street_id = CrossSTR.Streets_2_ID
	left join Houses on Houses.Id = Places.Street_id
	left join Area_House on Area_House.Id = Places.Area_id
	where Places.Id = @Id