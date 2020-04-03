        declare @output table ([Id] int);
		declare @cross_tb table ([Id] int);

insert CrossSTR (Name, Streets_1_ID, Streets_2_ID)
	output inserted.Id into @cross_tb(Id)
	values
		(
			(select Name from Streets where [Street_Id] = @m_street_id)
			,@m_street_id
			,@m_street_id
		)

	declare @cross_id int;
	set @cross_id = (select top 1 [Id] from @cross_tb);

	INSERT INTO [dbo].[Places]
			   ([Place_type_ID]
			   ,[District_ID]
			   ,[Name]
			   ,[Lattitude]
			   ,[Longitude]
			   ,Cross_id)
	output [inserted].[Id] into @output([Id])
	select 6, @m_district, Name, isnull(@latitude ,null), isnull(@longitude ,null), @cross_id 
	        from CrossSTR where Id = @cross_id
 
	declare @place_id int;
	set @place_id = (select top 1 [Id] from @output);

select @place_id as Id,
        (select Name from Places where Id = @place_id) as Name,
         6 as type_place, 
        (select Name from Place_types where Id = 6) as type_place_name,
        (select concat(Lattitude,' , ',Longitude) from Places where Id = @place_id) as coordinates
        
return

