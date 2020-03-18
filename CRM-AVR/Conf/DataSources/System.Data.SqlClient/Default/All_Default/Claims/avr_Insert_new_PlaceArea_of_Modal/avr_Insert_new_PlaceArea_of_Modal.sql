        declare @output table ([Id] int);
		declare @area_tb table ([Id] int);

insert Area_House(Name, Houses_id, Houses2_id)
	output inserted.Id into @area_tb(Id)
	values
		(
			(select Name from Houses where Id = @m_houses_id) + '/'+ (select Name from Houses where Id = @m_houses2_id)
			,@m_houses_id
			,@m_houses2_id
		)

	declare @area_id int;
	set @area_id = (select top 1 [Id] from @area_tb);

	INSERT INTO [dbo].[Places]
			   ([Place_type_ID]
			   ,[District_ID]
			   ,[Name]
			   ,[Lattitude]
			   ,[Longitude]
			   ,Area_id)
	output [inserted].[Id] into @output([Id])
	select 10, @m_district, Name, isnull(@latitude ,null), isnull(@longitude ,null), @area_id from Area_House where Id = @area_id
 
	declare @place_id int;
	set @place_id = (select top 1 [Id] from @output);

select @place_id as Id,
        (select Name from Places where Id = @place_id) as Name,
         10 as type_place, 
        (select Name from Place_types where Id = 10) as type_place_name,
        (select concat(Lattitude,' , ',Longitude) from Places where Id = @place_id) as coordinates,
        @m_district as district,
        (select Name from Districts where id = @m_district) as district_name
        
return