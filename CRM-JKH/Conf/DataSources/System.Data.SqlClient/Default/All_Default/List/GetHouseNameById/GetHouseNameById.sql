

if len(isnull(@HouseId,N'')) = 36
begin
    select  
		/*isnull(name_ofFirstLevel_shortToponym,N'')+N' '+*/isnull(name_ofFirstLevel_fullName,N'') as [Name]
	from  [dbo].[houses]
	where id = CONVERT(uniqueidentifier,@HouseId)
end
else
begin
	select N'' as [Name]
end
