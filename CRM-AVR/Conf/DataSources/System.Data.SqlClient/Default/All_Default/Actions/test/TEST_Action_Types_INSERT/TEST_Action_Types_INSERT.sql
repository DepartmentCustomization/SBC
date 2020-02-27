
declare @i int = 0
--declare @count int
--declare @action_type_id int
--declare @order_id int
-- declare @claim_id int
declare @diameter int
-- declare @value int
-- declare @diameter1 int
-- declare @diameter2 int
-- declare @diameter3 int


while ( @i < @count )
begin

set @diameter = case when @i = 0 then @diameter1
					 when @i = 1 then @diameter2
					 when @i = 2 then @diameter3
					 when @i = 3 then @diameter4
					 when @i = 4 then @diameter5
					 when @i = 5 then @diameter6
					 when @i = 6 then @diameter7
					 when @i = 7 then @diameter8
					 when @i = 8 then @diameter9
					 when @i = 9 then @diameter10
				end

	INSERT INTO [Actions]
			   ([Claim_ID]
			   ,[Order_ID]
			   ,[Action_type_ID]
			   --,[Place_ID]
			   ,[Sort_index]
			   ,[Is_Goal]
			   ,[Diameters_ID]
			   ,[Value]
			   )
		 VALUES
			   (@claim_id
			   ,@order_id
			   ,@action_type_id
			   --,<Place_ID, int,>
			   ,1
			   ,0
			   ,@diameter
			   ,1
			   )
	set @i = @i +1
			
end
