select 
1 as [GroupId],
N'Test project' as [GroupName],
17 as [CountAll],	
3 as [CountActivity]

union all
select 
2 as [GroupId],
N'Обговорення питання' as [GroupName],
17 as [CountAll],	
10 as [CountActivity]

union all
select 
3 as [GroupId],
N'что-то обсуждаем' as [GroupName],
17 as [CountAll],	
0 as [CountActivity]

union all
select 
4 as [GroupId],
N'Обговорення Обговорення Обговорення Обговорення' as [GroupName],
17 as [CountAll],	
4 as [CountActivity]

    union all
    select 
    1 as [GroupId],
    N'Test project' as [GroupName],
    17 as [CountAll],	
    3 as [CountActivity]
    
    union all
    select 
    2 as [GroupId],
    N'Обговорення питання стосовно ...' as [GroupName],
    17 as [CountAll],	
    10 as [CountActivity]
    
    union all
    select 
    3 as [GroupId],
    N'что-то обсуждаем' as [GroupName],
    17 as [CountAll],	
    0 as [CountActivity]
    
    union all
    select 
    4 as [GroupId],
    N'Обговорення Обговорення Обговорення Обговорення' as [GroupName],
    17 as [CountAll],	
    4 as [CountActivity]