INSERT INTO [dbo].[Claim_Order_Places]
           (
		   [Claim_ID]
           ,[Orders_ID]
           ,[Place_ID]
           ,[Flats_ID]
           ,[Is_first_place]
           ,[Is_demage_place]
           ,[Demage_place_description]
           ,[Lattitude]
           ,[Longitude]
		   )
output [inserted].[Id]
     VALUES
           (
		    @Claim_ID
           ,@Orders_ID
           ,@places_id
           ,@flats_id
           ,@Is_first_place
           ,@Is_demage_place
           ,@Demage_place_description
           ,@Lattitude
           ,@Longitude
		   )