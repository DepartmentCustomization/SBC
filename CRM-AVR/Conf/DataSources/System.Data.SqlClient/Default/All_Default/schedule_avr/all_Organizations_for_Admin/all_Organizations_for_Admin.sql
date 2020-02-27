select 
	Id
	,isnull(Short_name,[Name]) as Short_name
from Organizations
where Is_WC = 1 and Is_activ = 1
and id <> 28