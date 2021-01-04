
 -- declare @street_id nvarchar(max)--=N'1,2,3';

declare @table table (id int)


if @street_id is null
	begin
		insert into @table (Id)
		select Id from [dbo].[Streets] union select 0
	end

else
	begin
declare @input_str nvarchar(max) = @street_id+N','
 
 
declare @delimeter nvarchar(1) = ','
 
declare @pos int = charindex(@delimeter,@input_str)
 
declare @id nvarchar(10)
    
while (@pos != 0)
begin

    set @id = SUBSTRING(@input_str, 1, @pos-1)

    insert into @table (id) values(cast(@id as int))

    set @input_str = SUBSTRING(@input_str, @pos+1, LEN(@input_str))

    set @pos = CHARINDEX(@delimeter,@input_str)
end
	end

--select * from @table


  select [Buildings].[Id], [Buildings].[Name]
  from [dbo].[Buildings]
  inner join @table t on [Buildings].street_id=t.id
   where #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only





  /* 
  declare @Street_Id nvarchar(max) =N'2,54';
  declare @pageOffsetRows int=0;
  declare @pageLimitRows int=10;

*/
  --
  -- наша входная строка с айдишниками


-- declare @input_str nvarchar(100) = replace(@Street_Id, N' ', N'')+N','
 
-- -- создаем таблицу в которую будем
-- -- записывать наши айдишники
-- declare @table table (id int)
 
-- -- создаем переменную, хранящую разделитель
-- declare @delimeter nvarchar(1) = ','
 
-- -- определяем позицию первого разделителя
-- declare @pos int = charindex(@delimeter,@input_str)
 
-- -- создаем переменную для хранения
-- -- одного айдишника
-- declare @id nvarchar(10)
    
-- while (@pos != 0)
-- begin
--     -- получаем айдишник
--     set @id = SUBSTRING(@input_str, 1, @pos-1)
--     -- записываем в таблицу
--     insert into @table (id) values(cast(@id as int))
--     -- сокращаем исходную строку на
--     -- размер полученного айдишника
--     -- и разделителя
--     set @input_str = SUBSTRING(@input_str, @pos+1, LEN(@input_str))
--     -- определяем позицию след. разделителя
--     set @pos = CHARINDEX(@delimeter,@input_str)
-- end

-- --select * from @table
--   --




-- 	select [Id], [number] [name]
--   from 
--   (SELECT [Buildings].[Id]
--       ,[StreetTypes].shortname+[Streets].name+N', буд.'+[Buildings].[name] [number]
--   FROM [Buildings]
--   left join [Streets] on [Buildings].street_id=[Streets].Id
--   left join [StreetTypes] on [Streets].street_type_id=[StreetTypes].Id
--   where 
--     [street_id] in (select Id from @table)) q
--      where #filter_columns#
--   #sort_columns#
--  offset @pageOffsetRows rows fetch next @pageLimitRows rows only

*/