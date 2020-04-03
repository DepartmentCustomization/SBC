
insert into [dbo].[Positions]
	(Name)
output [inserted].[Id]
values
	(@Name)