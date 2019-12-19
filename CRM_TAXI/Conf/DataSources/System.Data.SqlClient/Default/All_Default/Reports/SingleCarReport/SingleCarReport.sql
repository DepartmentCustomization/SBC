    -- declare @dateFrom datetime = null;
    -- declare @dateTo datetime = '2019-11-30 00:00:00';
    -- declare @carId int = 10;

declare @cars table (Id int, number nvarchar(50), [name] int, mark nvarchar(100), [create_year] int)

declare @cars_start_run table (car_id int, start_period_run int)
declare @cars_end_run table (car_id int, end_period_run int)
declare @cars_period_run table (car_id int, pediod_run int)
declare @car_parts_price table (car_id int, change_price float)
   
BEGIN

if (@dateFrom is not null) 
and (@dateTo is not null) 
begin
----------------------> Start finding data <---------------------------
Insert into @cars
Select distinct 
Id,
cars_number,
cars_name,
cars_mark,
cars_year
from Cars car
where Id = @carId

Insert into @cars_start_run
Select
car.Id,
isnull(max(run_km),0) run_km
from RunCar run 
join @cars car on car.Id = run.car_id
where cast(run.create_date as date) <= dateadd(hour,3,@dateFrom)
group by car.Id 


Insert into @cars_end_run
Select
car.Id,
isnull(max(run_km),0) run_km
from RunCar run 
join @cars car on car.Id = run.car_id
where cast(run.create_date as date) <= dateadd(hour,3,@dateTo) 
and cast(run.create_date as date) > dateadd(hour,3,@dateFrom)
group by car.Id 

Insert into @cars_period_run 
Select 
s.car_id,
e.end_period_run - s.start_period_run as pedior_run
from @cars_start_run s
join @cars_end_run e on e.car_id = s.car_id


Insert into @car_parts_price
Select 
car.Id, 
isnull(sum(change.part_price),0) as change_price
from @cars car
left join PartChange change on change.cars_id = car.Id 
where cast(change.create_date as date) 
between dateadd(hour,3,@dateFrom)
and dateadd(day,1,@dateTo)
group by car.Id

----------------------> End finding data <---------------------------
end

Else 
begin
set @dateFrom = dateadd(month,-1,current_timestamp)
set @dateTo = cast(current_timestamp as date)

----------------------> Start finding data <---------------------------
Insert into @cars
Select distinct 
Id,
cars_number,
cars_name,
cars_mark,
cars_year
from Cars car
where Id = @carId

Insert into @cars_start_run
Select
car.Id,
isnull(max(run_km),0) run_km
from RunCar run 
join @cars car on car.Id = run.car_id
where cast(run.create_date as date) <= @dateFrom
group by car.Id 


Insert into @cars_end_run
Select
car.Id,
isnull(max(run_km),0) run_km
from RunCar run 
join @cars car on car.Id = run.car_id
where cast(run.create_date as date) <= @dateTo
and cast(run.create_date as date) > @dateFrom
group by car.Id 

Insert into @cars_period_run 
Select 
s.car_id,
e.end_period_run - s.start_period_run as pedior_run
from @cars_start_run s
join @cars_end_run e on e.car_id = s.car_id


Insert into @car_parts_price
Select 
car.Id, 
isnull(sum(change.part_price),0) as change_price
from @cars car
left join PartChange change on change.cars_id = car.Id 
where cast(change.create_date as date) 
between @dateFrom
and @dateTo
group by car.Id
end

Select 
car.Id,
car.number,
car.[name],
car.mark,
car.create_year,
start_run.start_period_run,
end_run.end_period_run,
period_run.pediod_run

from @cars car
inner join @cars_start_run start_run on start_run.car_id = car.Id
inner join @cars_end_run end_run on end_run.car_id = car.Id 
inner join @cars_period_run period_run on period_run.car_id = car.Id 
left join @car_parts_price parts on parts.car_id = car.Id 

END