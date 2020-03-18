declare @output table ([Id] int);
declare @output2 table ([Id] int);
declare @output3 table ([Id] int);
declare @area_name nvarchar(200);
declare @cross_name nvarchar(200);
declare @cr_id int;
declare @place_id int

IF @place_types_id not in (10,19,6)
BEGIN
	 if  (select Street_id from Places where Street_id = @streets_id) = @streets_id 
	 and (select Place_type_ID from Places where Street_id = @streets_id) = @place_types_id
	 begin 
		print 'Місце все існує'
		return
	 end
	 else
	 begin
		INSERT INTO [dbo].[Places]
				   ([Place_type_ID]
				   ,[District_ID]
				   ,[Name]
				   ,[Lattitude]
				   ,[Longitude]
				   ,[Street_id]
				   )
		output [inserted].[Id]  into @output([Id])
			select 
				 @place_types_id
				,@distincts_id
				,Name
				,isnull(Latitude,  @Latitude)
				,isnull(Longitude, @Longitude)
				,Id
			from Houses
			where Id = @streets_id

			set  @place_id = (select top 1 [Id] from @output)
			
			update Houses
			    set District_id = @distincts_id
			where Id = (select street_id from Places where Id = @place_id)
	end
END


IF @place_types_id = 19
begin
	set @cross_name =  (  (select [Name] from Streets where [Street_Id] = @cross_str_id1) 
	                        + ' / ' 
	                        + (select [Name] from Streets where [Street_Id] =@cross_str_id2)  )
	INSERT INTO [dbo].[CrossSTR]
				   ([Name]
				   ,[Streets_1_ID]
				   ,[Streets_2_ID])
	output [inserted].[Id]  into @output2([Id])
			 VALUES
				   (
					@cross_name
				   ,@cross_str_id1
				   ,@cross_str_id2
				   )
	
		set @cr_id = (select top 1 [Id] from @output2);
	INSERT INTO [dbo].[Places]
           ([Place_type_ID]
		   ,[Name]
		   ,[Lattitude]
		   ,[Longitude]
		   ,Cross_id
		   ,District_ID
		   )
	output [inserted].[Id]  into @output([Id])
	values
			(
			@place_types_id
			,@cross_name
			,@Latitude
			,@Longitude
			,@cr_id
			,@distincts_id
			)
		set  @place_id = (select top 1 [Id] from @output)
end;

-- well
IF @place_types_id = 6 
begin
	select @cross_name = [Name] from Streets where [Street_Id] = @cross_str_id1
	INSERT INTO [dbo].[CrossSTR]
				   ([Name]
				   ,[Streets_1_ID]
				   ,[Streets_2_ID])
	output [inserted].[Id]  into @output2([Id])
			 VALUES
				   (
					@cross_name
				   ,@cross_str_id1
				   ,@cross_str_id1
				   )
		set @cr_id = (select top 1 [Id] from @output2);
	INSERT INTO [dbo].[Places]
           ([Place_type_ID]
		   ,[Name]
		   ,[Lattitude]
		   ,[Longitude]
		   ,Cross_id
		   ,District_ID
		   )
		output [inserted].[Id]  into @output([Id])
	values
			(
			@place_types_id
			,@cross_name
			,@Latitude
			,@Longitude
			,@cr_id
			,@distincts_id
			)
		set  @place_id = (select top 1 [Id] from @output)
end;

IF @place_types_id = 10
begin

	set  @area_name = concat ((select name from Houses where Id = @from_house), ' / ',
												(select name from Houses where Id = @to_house));
												
		INSERT INTO [dbo].[Area_House]
				   ([Name],Houses_id, Houses2_id)
	output [inserted].[Id]  into @output3([Id])
			 VALUES
				   (
					@cross_name
				   ,@cross_str_id1
				   ,@cross_str_id2
				   )
		declare @ar_id int;
		set @ar_id = (select top 1 [Id] from @output3);											
	
	INSERT INTO [dbo].[Places]
           ([Place_type_ID]
		   ,[Name]
		   ,Area_Id
		   ,District_ID
		   )
		output [inserted].[Id]  into @output([Id])
	values
			(
			 @place_types_id
			,@area_name
			,@ar_id
			,@distincts_id
			)
		set  @place_id = (select top 1 [Id] from @output)
end;


select @place_id as Id;
return;


/*declare @output table ([Id] int);

--@cross_str_id1 = @streets_id;

INSERT INTO [dbo].[Places]
           ([Place_type_ID]
           ,[District_ID]
           ,[Lattitude]
           ,[Longitude]
           --,[Street_id]
		   )
output [inserted].[Id]  into @output([Id])
     VALUES
           (
		    @place_types_id
           ,@distincts_id
           ,@Lattitude
           ,@Longitude
           --,@streets_id
		   )

declare @place_id int;
set @place_id = (select top 1 [Id] from @output);

declare @output2 table ([Id] int);

declare @cross_name nvarchar(200) = concat (
											(select name from Streets where Id = @cross_str_id1), ' / ',
											(select name from Streets where Id =@cross_str_id2)
											);
declare @houses_name nvarchar(50) = concat(
											N'буд. ', cast(@Number as nvarchar(10))
										   ,(case when @Letter is null then @Letter else N' '+ @Letter end)
										   ,(case when @Сorps is null then @Сorps else N' '+ @Сorps end)
										   );
										   
if @place_types_id = 19
begin

		INSERT INTO [dbo].[CrossSTR]
				   ([Name]
				   ,[Streets_1_ID]
				   ,[Streets_2_ID])
		output [inserted].[Id]  into @output2([Id])
			 VALUES
				   (
					@cross_name
				   ,@cross_str_id1
				   ,@cross_str_id2
				   )

	declare @relation_obj_id int;
	set @relation_obj_id = (select top 1 [Id] from @output2);

	declare @place_name nvarchar(200) = concat(
												N'ПЕРЕХРЕСТЯ: '
												--(select Name from Place_types where Id= @place_types_id)
												, @cross_name
												);

	UPDATE [dbo].[Places]
	SET Relation_obj_ID = @relation_obj_id
		,[Name] = @place_name
	WHERE [Places].[Id] = @place_id

end;

if @place_types_id in (11,12,14,15,16,17,18)
begin
		INSERT INTO [dbo].[Houses]
           ([Street_id]
           ,[Number]
           ,[Letter]
           ,[Сorps]
           ,[Name]
           ,[District_id]
           ,[Holder_id])
	output [inserted].[Id]  into @output2([Id])
     VALUES
           (
		    @streets_id
           ,@Number
           ,@Letter
           ,@Сorps
           ,@houses_name
           ,@distincts_id
           ,@organizations_id
		   )

	set @relation_obj_id = (select top 1 [Id] from @output2);

	set @place_name = concat(
							(select Name from Place_types where Id= @place_types_id),': ',
							(select name from Streets where Id = @streets_id),',',
							@houses_name
							);

	UPDATE [dbo].[Places]
	SET Relation_obj_ID = @relation_obj_id
		,[Name] = @place_name 
		,[Street_id] = @streets_id
	WHERE [Places].[Id] = @place_id
end;

if @place_types_id not in (11,12,14,15,16,17,18,19)
begin
	set @place_name = concat(
							(select Name from Place_types where Id= @place_types_id),': ',
							(select name from Streets where Id = @streets_id)
							);

		UPDATE [dbo].[Places]
		SET [Name] = @place_name
			,[Street_id] = @streets_id
		WHERE [Places].[Id] = @place_id
end;

select @place_id as Id;
return;
*/