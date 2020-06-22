-- DECLARE @Id INT = 225;

SELECT
    p.[Id] AS Id,
    p.[part_name] AS partName,
    p.[articul],
    MAX(pc.[install_date]) AS install_date,
    COUNT(pc.[Id]) AS partQty,
    ROUND(pc.[part_price],3) AS part_price
FROM
    dbo.[PartChange] pc
    INNER JOIN dbo.[Parts] p ON p.Id = pc.part_id
WHERE
    pc.cars_id = @Id
    AND remove_operation_id IS NULL
    AND #filter_columns#
	GROUP BY p.[Id],
			 p.[part_name],
			 p.[articul],
			 pc.[part_price]
    #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;