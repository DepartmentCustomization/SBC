SELECT 
eh.Id,
eh.employee_id,
h.id as house_id,
s.name_shortToponym + N' ' + s.name_fullName + N', ' + h.name_ofFirstLevel_fullName as house

FROM dbo.employees_houses eh 
INNER JOIN dbo.employees e on e.Id = eh.employee_id
INNER JOIN dbo.houses h on h.Id = eh.house_id
INNER JOIN dbo.streets s on s.Id = h.ofStreet_id
WHERE eh.Id = @Id