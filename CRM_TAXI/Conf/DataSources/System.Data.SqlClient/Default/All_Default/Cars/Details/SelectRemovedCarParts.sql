DECLARE @removal_part TABLE (
      part_id INT,
      instrall_date DATETIME,
      remove_id INT,
      run_km_onInstall INT
);

BEGIN
INSERT INTO
      @removal_part
SELECT
      p.Id,
      pc.install_date,
      pc.remove_operation_id,
      pc.run_km_install_day
FROM
      [dbo].PartChange pc
      JOIN [dbo].Parts p ON p.Id = pc.part_id
WHERE
      pc.cars_id = @Id
      AND remove_operation_id IS NOT NULL;
END
DECLARE @removeInfo TABLE (
      Id INT,
      partName NVARCHAR(100),
      removeDate DATETIME,
      run_km INT,
      run_day INT
);
INSERT INTO
      @removeInfo
SELECT
      rp.part_id,
      p.[part_name] AS partName,
      rd.install_date AS removeDate,
      rd.run_km_install_day - rp.run_km_onInstall AS run_km,
      DATEDIFF(DAY, rp.instrall_date, rd.install_date) run_day
FROM
      @removal_part rp
      JOIN [dbo].Parts p ON p.Id = part_id
      JOIN (
            SELECT
                  Id,
                  install_date,
                  run_km_install_day
            FROM
                  [dbo].PartChange
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
      @removeInfo;
