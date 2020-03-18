insert into [dbo].[Mechanisms_Jobs_Link]
		(MechanismsID
		,JobsID)
output [inserted].[Id]

	values
		(@mechanisms_id
		,@jobs_id)