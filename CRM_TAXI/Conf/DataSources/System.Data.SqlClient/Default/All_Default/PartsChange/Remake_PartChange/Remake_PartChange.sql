declare @info table (Id int, part_id int, car_id int, invoice nvarchar(100) );
declare @create_info table (invoice_consumption nvarchar(100), install_date datetime, creator_id nvarchar(128), create_date datetime)


----declare @changeId int;
----declare @prev_part_id int = 6;
----declare @part_id int;
----declare @cars_id int = 1;
----declare @user_id nvarchar(128) = (select top 1 UserId from CRM_TAXI_System.dbo.[User]);


declare @part_price float = (select part_price from Parts where Id = @part_id);
declare @run_km_install_day int = (select isnull(run_km,0) from RunCar 
                                   where car_id = @cars_id and create_date =
                                            (select MAX(create_date) from RunCar where car_id = @cars_id) );
    begin
    Insert into @create_info
    Select 
    invoice_consumption,
	install_date,
	creator_id,
	create_date
    from PartChange
    where Id = @changeId 
	end

    declare @is_prev_removed bit = ( 
	select case 
	when (select Id from PartChange where remove_operation_id = @changeId) is not null 
	then 1 else 0 end );
	
	if(@is_prev_removed = 1)
	begin
	Update PartChange 
	set remove_operation_id = null 
	where remove_operation_id = @changeId
	end

	Update Parts 
	set part_quantity += 1
	where Id = (select part_id from PartChange where Id = @changeId)

	delete from PartChange 
	where Id = @changeId

INSERT INTO [dbo].[PartChange]
           ([part_id]
           ,[cars_id]
           ,[part_price]
           ,[install_date]
           ,[run_km_install_day]
           ,[invoice_consumption]
           ,[is_install_first]
           ,[remove_operation_id]
           ,[creator_id]
           ,[create_date]
           ,[editor_id]
           ,[edit_date])
	Output inserted.Id, inserted.part_id, inserted.cars_id, inserted.invoice_consumption into @info
    select
	        @part_id
           ,@cars_id
           ,@part_price
           ,install_date
           ,@run_km_install_day
           ,invoice_consumption
           ,IIF(@prev_part_id is null, 1, 0)
           ,null
           ,creator_id
           ,create_date
           ,@user_id
           ,getutcdate()
		    from @create_info

		if(@prev_part_id is not null)
		begin
		Update PartChange 
		set remove_operation_id = (select top 1 Id from @info)
		where cars_id = @cars_id 
		and part_id = @prev_part_id
		and remove_operation_id is null
        and Id < (select top 1 Id from @info)
		end

		Update Parts
		set part_quantity -=1
		where Id = @part_id


	if(select Id from @info) is not null
   begin
   select 
	'Списание по накладной"' + i.invoice + '" изменено', Id
   from @info i
   end