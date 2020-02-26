
declare @OrgId_TEXT as nvarchar(max)
set @OrgId_TEXT = left((SELECT ''+rtrim([Id])+'' + ',' FROM [dbo].[Organizations]  where Id @Org_Id FOR xml path(''))
                ,len((SELECT ''+rtrim([Id])+'' + ',' FROM [dbo].[Organizations] where Id @Org_Id FOR xml path('')))-1)

 
 execute avr_first_chart 5508 -- @OrgId_TEXT
 
 -- есть параметр для фильтрации по организациям @Org_Id
 -- по умолчанию в процедуре он стоит 19 Киевводоканал






 -- тестовые данные
 
/*select N'Понеділок' as Type, 1 as 'Registered', 7 as 'In_the_work',  9 as 'Done'
union all
select  N'Вівторок' as Type,  11 as 'Registered', 7 as 'In_the_work',  11 as 'Done'
union all
select  N'Середа' as Type,  6 as 'Registered', 17 as 'In_the_work',  8 as 'Done'
union all
select  N'Черверг' as Type,  12 as 'Registered', 3 as 'In_the_work',  19 as 'Done'
union all
select  N'П`ятниця' as Type,  17 as 'Registered', 20 as 'In_the_work',  4 as 'Done'
union all
select  N'Субота' as Type,  4 as 'Registered', 15 as 'In_the_work', 1 as 'Done'
union all
select  N'Неділя' as Type,  1 as 'Registered', 7 as 'In_the_work',  5 as 'Done'


*/

