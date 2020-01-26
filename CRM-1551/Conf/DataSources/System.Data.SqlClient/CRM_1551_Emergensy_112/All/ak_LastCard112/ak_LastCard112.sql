SELECT e.Id, e.[event_date] receipt_date, e.[longitude], e.[latitude], app.person_phone, e.[content],
  ISNULL(app.last_name+N' ',N'')+ISNULL(app.first_name+N' ',N'')+ISNULL(app.middle_name,N'') FIO
  FROM [dbo].[Events] e
  LEFT JOIN [dbo].[Persons] app ON e.applicant_id=app.id
  WHERE 
  #filter_columns#
  ORDER BY 1 DESC--#sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
