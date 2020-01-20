-- DECLARE @Id INT = 1;

DECLARE @removal_part TABLE (
      part_id INT,
      instrall_date DATETIME,
      remove_id INT,
      run_km_onInstall INT,
      cars_name INT
);

BEGIN
INSERT INTO
      @removal_part
SELECT
      p.Id,
      pc.install_date,
      pc.remove_operation_id,
      pc.run_km_install_day,
      c.cars_name
FROM
      dbo.PartChange pc
      INNER JOIN dbo.Parts p ON p.Id = pc.part_id
      INNER JOIN dbo.Cars c ON c.Id = pc.cars_id
WHERE
      p.category_id = @Id
      AND remove_operation_id 
      IS NOT NULL;
END 
--select * from @removal_part
DECLARE @removeInfo TABLE (
      Id INT,
      part_name NVARCHAR(100),
      remove_date DATETIME,
      cars_name INT,
      run_km INT,
      run_day INT
);

INSERT INTO
      @removeInfo
SELECT
      rp.part_id,
      p.[part_name],
      rd.install_date,
      rp.cars_name,
      rd.run_km_install_day - rp.run_km_onInstall AS run_km,
      datediff(DAY, rp.instrall_date, rd.install_date) run_day
FROM
      @removal_part rp
      INNER JOIN dbo.Parts p ON p.Id = part_id
      JOIN (
            SELECT
                  Id,
                  install_date,
                  run_km_install_day
            FROM
                  dbo.PartChange
            WHERE
                  Id IN (
                        SELECT
                              remove_id
                        FROM
                              @removal_part
                  )
      ) rd ON rd.Id = rp.remove_id;

SELECT
      *
FROM
      @removeInfo
WHERE
      #filter_columns#
ORDER BY
      remove_date DESC
 offset @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only;