declare @info table (Id int, part_id int, car_id int );

--declare @is_install_first bit;
--declare @prev_part_id int = 6;
--declare @part_id int;
--declare @cars_id int = 1;
--declare @invoice_consumption nvarchar(100);
--declare @user_id nvarchar(128) = (select top 1 UserId from CRM_TAXI_System.dbo.[User]);

declare @part_price float = (select part_price from Parts where Id = @part_id);
declare @run_km_install_day int = (select isnull(run_km,0) from RunCar
                                   where car_id = @cars_id and create_date =
                                        (select MAX(create_date) from RunCar where car_id = @cars_id)
																		);
begin
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
	Output inserted.Id, inserted.part_id, inserted.cars_id into @info
    Values(
	        @part_id
           ,@cars_id
           ,@part_price
           ,getutcdate()
           ,@run_km_install_day
           ,@invoice_consumption
           ,IIF(@prev_part_id is null, 1, 0)
           ,null
           ,@user_id
           ,getutcdate()
           ,@user_id
           ,getutcdate()
		   )

		if(@prev_part_id is not null)
		begin
		Update PartChange 
		set remove_operation_id = (select top 1 Id from @info)
		where cars_id = @cars_id 
		and part_id = @prev_part_id
		and remove_operation_id is null
        and Id < (select top 1 Id from @info)
		end

		
end

	if(select Id from @info) is not null
    begin
        Update Parts
		set part_quantity -=1
		where Id = @part_id
    select 
	'Запчасть "' + p.part_name + '" установлено в машину "' + cast(c.cars_name as nvarchar(25)) +'"'
    from @info i
	join Parts p on p.Id = i.part_id
	join Cars c on c.Id = i.car_id 
    end