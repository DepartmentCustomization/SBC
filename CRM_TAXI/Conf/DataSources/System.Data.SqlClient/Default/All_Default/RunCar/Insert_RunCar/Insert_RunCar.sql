declare @info table (Id int);

declare @cars_maxRun table (car_id int, run_km int);
declare @import_filter table (car_id int, run_km int, import_month_qty tinyint, run_km_more bit)

Insert into @cars_maxRun
select i.car_id, isnull(max(rc.run_km),0) run 
from Import_RunCar i 
left join RunCar rc on i.car_id = rc.car_id
--where rc.car_id in (select car_id from @main_tab)
group by i.car_id

-- select * from @cars_maxRun

Insert into @import_filter
Select 
m.car_id,
m.run_km,
isnull(count(z.car_id),0) month_import_qty,
iif(cm.run_km > m.run_km , 0, 1 )

from Import_RunCar m 
left join @cars_maxRun cm on cm.car_id = m.car_id
left join( select car_id, run_km 
           from RunCar 
		   where year(create_date) = year(current_timestamp) 
           and month(create_date) = month(current_timestamp) ) z on z.car_id = m.car_id

group by 
m.car_id,
m.run_km,
cm.run_km

--select * from @import_filter

begin
Insert into RunCar ( 
            car_id,
			run_km,
			creator_id,
			create_date,
			editor_id,
			edit_date )
OUTPUT inserted.Id into @info(Id)
Select 
    irc.car_id,
	irc.run_km,
	@user_id,
	getutcdate(),
	@user_id,
	getutcdate()          
    from Import_RunCar irc
	join @import_filter imf on irc.car_id = imf.car_id
	where imf.import_month_qty < 2
	and imf.run_km_more = 1

	select 'Успешно загружено ' + cast(count(Id) as nvarchar(15)) + ' строк в таблицу пробега '  from @info
	end
		delete from Import_RunCar