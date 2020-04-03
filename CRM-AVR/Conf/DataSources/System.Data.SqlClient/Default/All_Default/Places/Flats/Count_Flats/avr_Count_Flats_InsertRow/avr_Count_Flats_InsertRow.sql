declare @Start_flats int;
declare @End_flats int;
set @Start_flats = cast(@Start as int);
set @End_flats = cast(@End as int);


WHILE @Start_flats <=  @End_flats
		BEGIN  
			if (select Number from Flats where Houses_ID =@hous_id and Number=@Start_flats ) = @Start_flats
				SET @Start_flats = @Start_flats+1
			else 
				INSERT INTO [dbo].[Flats]([Number],[Houses_ID])
				select @Start_flats , @hous_id
				SET @Start_flats = @Start_flats+1
		END  


-- if (select Place_type_ID from Places where Places.Street_id = @hous_id) in (11,14)
-- begin
	
-- end
