		declare @house_tb table ([Id] int);
IF (select count(Name) from Houses where Street_id =  @m_houses_id 
	and Number = replace(@m_house_number,' ','') and isnull(Letter,'') = replace(isnull(@m_house_letr,''),' ','')) > 0
begin
	print 'Такой дом уже существует'
	return
end
ELSE
begin
		insert Houses
			(Street_id
			,Number
			,Letter
			,Name
			,District_id
			)
	output inserted.Id into @house_tb(Id)
		select Street_Id
			,replace(@m_house_number,' ','')
			,replace(@m_house_letr,' ','')
			,concat(Streets.Name,' ', st.UkrName,', ', replace(@m_house_number,' ',''), replace(@m_house_letr,' ',''))  
			,@m_District
		from Streets 
		left join Street_Type st on st.TypeId = Streets.Street_type_id 
		where Street_Id = @m_houses_id

	declare @house_id int;
	set @house_id = (select top 1 [Id] from @house_tb);
 
	select @house_id as Id        
	return
end
