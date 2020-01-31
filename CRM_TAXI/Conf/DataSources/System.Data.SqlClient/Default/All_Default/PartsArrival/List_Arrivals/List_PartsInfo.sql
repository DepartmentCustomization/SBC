SELECT
    pa.Id,
    c.category_name,
    p.part_name,
    p.articul,
    p.manufacturer,
    p.part_price,
    p.part_quantity,
    ROUND(p.part_price * ISNULL(p.part_quantity,0),2) AS sum_price
FROM
    dbo.Parts p
    INNER JOIN Categories c ON c.Id = p.category_id
    INNER JOIN PartArrival pa ON p.Id = pa.part_id
WHERE 
   #filter_columns#
   #sort_columns#
 
   OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;