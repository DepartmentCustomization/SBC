declare @CountAll int;
set @CountAll = (select count(1) FROM [dbo].[zx_MessageActivityDetail]
                  where /*[AddresseeUserById] = @UserId
                  and */IsRead <> 1);

SELECT [Id]
,@CountAll as [CountAll]
,case when [Text] like N'%булися зміни%' or [Text] like N'%зміни%' then N'Edit'
      when [Text] like N'%додали%' then N'Add'
      when [Text] like N'%видалили%' then N'Delete'
	end as [Status]
,case when [Text] like N'%проект%' then N'Project'
      when [Text] like N'%задач%' then N'Work'
	  when [Text] like N'%докум%' then N'Document'
	end as [Code]
,[Text]
,[CreatedAt]
,'/sections/Actions/view/'+rtrim([Id]) as [URL]
,case when [Text] like N'%булися зміни%' or [Text] like N'%зміни%' then N'Редаговано'
      when [Text] like N'%додали%' then N'Додано'
      when [Text] like N'%видалили%' then N'Видалено'
	end as [StatusTitle]
,case when [Text] like N'%проект%' then N'Проект'
      when [Text] like N'%задач%' then N'Задача'
	  when [Text] like N'%докум%' then N'Документ'
	end as [CodeTitle]
  FROM [dbo].[zx_MessageActivityDetail]
  where /*[AddresseeUserById] = @UserId
  and */ IsRead <> 1
  order by [CreatedAt] desc
  
  