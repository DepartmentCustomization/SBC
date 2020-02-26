  select Id, ShortName from Units

  where Id = (select Units_Id from Action_types where id = 
		(select [Action_type_Id] from Action_type_Place_type where id =  @act_type) ) 
  
  
  