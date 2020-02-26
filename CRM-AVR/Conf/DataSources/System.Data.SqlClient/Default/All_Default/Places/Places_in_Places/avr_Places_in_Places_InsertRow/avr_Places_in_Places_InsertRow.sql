
	INSERT INTO [dbo].[Places_in_places]
           ([Parent_place_id]
           ,[Child_place_id]
           ,[Type_PP_link_ID])
	output [inserted].[Id]
     VALUES
           (
		    @places_id
           ,@places2_id
           ,@type_pp_link_id
		   )