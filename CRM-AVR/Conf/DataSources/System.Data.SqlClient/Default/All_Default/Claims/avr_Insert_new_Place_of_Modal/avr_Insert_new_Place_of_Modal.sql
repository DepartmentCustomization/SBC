        declare @output table ([Id] int);
		declare @house_tb table ([Id] int);
	--	declare @m_houses_id  int = 5
	--	declare @m_house_number  nvarchar(50) = '2'
	--	declare @m_house_letr  nvarchar(50) = '/ 32 К8'
	
-- if @m_house_letr = ''  begin set @m_house_letr = null end

if (select count(Name) from Houses where Street_id =  @m_houses_id 
	and Number = replace(@m_house_number,' ','') and isnull(Letter,'') = replace(isnull(@m_house_letr,''),' ','')) > 0
begin
	print 'Такой дом уже существует'
	return
	
end

else

begin
		insert Houses
			(Street_id
			,Number
			,Letter
			,Name
			,District_id
			,Longitude
			,Latitude
			)
	output inserted.Id into @house_tb(Id)
		select Street_Id
			,replace(@m_house_number,' ','')
			,replace(@m_house_letr,' ','')
			,concat(Streets.Name,' ', st.UkrName,', ', replace(@m_house_number,' ',''), replace(@m_house_letr,' ',''))
			,@m_District
			,@longitude
			,@latitude  
		from Streets 
		left join Street_Type st on st.TypeId = Streets.Street_type_id 
		where Street_Id = @m_houses_id

	declare @house_id int;
	set @house_id = (select top 1 [Id] from @house_tb);

	INSERT INTO [dbo].[Places]
			   ([Place_type_ID]
			   ,[District_ID]
			   ,[Name]
			   ,[Lattitude]
			   ,[Longitude]
			   ,[Street_id])
	output [inserted].[Id] into @output([Id])
	select @m_Place_type_ID, @m_District, [Name], Latitude, Longitude, @house_id from Houses where Id = @house_id
 
	declare @place_id int;
	set @place_id = (select top 1 [Id] from @output);



select @place_id as Id,
        (select Name from Houses where Id = @house_id) as Name,
         @m_Place_type_ID as type_place, 
        (select Name from Place_types where Id = @m_Place_type_ID) as type_place_name,
        @m_District as district,
        (select Name from Districts where id = @m_District) as district_name,
         (select concat(Lattitude,' , ',Longitude) from Places where Id = @place_id) as coordinates
        
return
end

/*declare @output table ([Id] int);

INSERT INTO [dbo].[Places]
           ([Place_type_ID]
           ,[District_ID]
           ,[Name]
           ,[Lattitude]
           ,[Longitude]
           ,[Street_id])
output [inserted].[Id] into @output([Id])
select @m_Place_type_ID, @m_District, [Name], Latitude, Longitude, @m_houses_id from Houses where Id = @m_houses_id
 
declare @place_id int;
set @place_id = (select top 1 [Id] from @output);

select @place_id as Id,
        (select Name from Houses where Id = @m_houses_id) as Name,
         @m_Place_type_ID as type_place, 
        (select Name from Place_types where Id = @m_Place_type_ID) as type_place_name,
        @m_District as district,
        (select Name from Districts where id = @m_District) as district_name;
        
return
*/