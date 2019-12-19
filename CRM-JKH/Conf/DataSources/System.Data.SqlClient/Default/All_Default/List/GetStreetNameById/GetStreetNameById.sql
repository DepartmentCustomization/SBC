

if len(isnull(@StreetId,N'')) = 36
begin
    select isnull(name_shortToponym,N'')+N' '+isnull(name_fullName,N'') as [Name]
    from  [dbo].[streets]
    where id = CONVERT(uniqueidentifier,@StreetId)
end
else
begin
	select N'' as [Name]
end