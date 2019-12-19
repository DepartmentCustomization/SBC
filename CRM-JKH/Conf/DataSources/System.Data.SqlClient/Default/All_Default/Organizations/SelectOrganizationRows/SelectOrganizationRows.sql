SELECT 
   org.Id,
   org.[Name],
   claim_direction_id,
   c_d.[Name] as claim_direction_name,
   appeal_source_id,
   a_s.[Name] as appeal_source_name,
   phone_1,
   phone_2

   FROM dbo.organizations  org
   INNER JOIN dbo.appeal_sources a_s on org.appeal_source_id = a_s.Id 
   INNER JOIN claim_directions c_d on org.claim_direction_id = c_d.Id
   WHERE #filter_columns#
         #sort_columns#
   OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY