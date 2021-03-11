select Id, Name 
from 
(
   select 1 as ID, N'Виїзди' Name
   union
   select 2 as ID, N'Бригади у виїздах'
   union
   select 3 as ID, N'Техніка у виїздах'  
   union
   select 4 as ID, N'Запірна арматура'  
   union
   select 5 as ID, N'Відключення'
   union
   select 6 as ID, N'Відключення боржників'
   union
   select 7 as ID, N'Виклик спецслужб'
   union
   select 8 as ID, N'Роботи'
   union
   select 9 as ID, N'Матеріали у роботах'
   union
   select 10 as ID, N'Ускладнення по роботі'
) a
   where #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only