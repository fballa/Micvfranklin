-- ============================================================================
-- SCRIPT 2: CREACI�N DE LAS 2 VISTAS
-- Ejecutar DESPU�S del script de tablas.
-- ===========================================================================

/********* Vista para obtener los puntos de servicios en mora  ***************************/

CREATE OR REPLACE VIEW FICOHSA.VW_PUNTOS_SERVICIO_AMERICA_MORA AS 
SELECT  
         eps.codpuntoservicio,
         eps.descripcion as punto_servicio,
         eps.estado as estado_ps  ,
         EPS.CODAGENCIA,
         f.idefact, 
         f.numfact, 
         f.fecvencfact,
         f.mtofactmoneda, 
         f.sldofactmoneda,
         f.stsfact , 
         f.ideop, 
         F.CODMONEDA, 
         f.mtofactlocal, 
         (TRUNC(SYSDATE) - TRUNC(f.fecvencfact)) as cant_dias,
         ABS(F.MtoFactMoneda - F.SldoFactMoneda) as PAGADO, 
         A.SLDOACREMONEDA as vencido_pendiente,
         A.MTOACREMONEDA FACTURADO,
         F.FECSTS,
         op.numoper,
         p.stspol,
         p.codcli,
         p.idepol         
      from factura f 
INNER JOIN ACREENCIA A on f.idefact = a.idefact 
inner join oper_pol op  on f.ideop = op.numoper
inner join poliza p on op.idepol = p.idepol
inner join estr_punto_servicio eps on p.codpuntoservicio = eps.codpuntoservicio
INNER JOIN estr_agencia eag ON EPS.CODAGENCIA = EAG.CODAGENCIA
inner join estr_comercializadora eco on  eco.codcomercializadora = eag.codcomercializadora
inner join estr_territorio et On  et.codterritorio = eco.codterritorio
     where (((f.stsfact = 'INC'  AND f.fecvencfact < sysdate))  AND a.tipoacre <> 'SAL'  AND ET.CODDIVISION=12
       AND (A.SLDOACREMONEDA > 0) AND (ABS(F.MtoFactMoneda - F.SldoFactMoneda) <= 0)
       and ((TRUNC(SYSDATE) - TRUNC(f.fecvencfact)) > 0)
       AND ( f.fecvencfact  > (SYSDATE - 60) ) )
  order by eps.codpuntoservicio  desc;    
/


CREATE OR REPLACE PUBLIC SYNONYM VW_PUNTOS_SERVICIO_AMERICA_MORA FOR FICOHSA.VW_PUNTOS_SERVICIO_AMERICA_MORA;


GRANT  SELECT ON FICOHSA.VW_PUNTOS_SERVICIO_AMERICA_MORA TO ROL_ACSELX;



/*****************          Vista para obtener los puntos de servicios bloqueados     **********************************/

CREATE OR REPLACE VIEW FICOHSA.VW_PUNTOS_SERVICIO_AMERICA_MORA_EST AS 
SELECT  
         eps.codpuntoservicio AS CODPUNTOSERVICIO,
         eps.descripcion as PUNTO_SERVICIO,
         NVL(BPS.ESTADO,'ACTIVO') AS  ESTADO_PS ,
         EPS.CODAGENCIA ,
         MAX(TRUNC(SYSDATE) - TRUNC(f.fecvencfact)) as CANT_DIAS,
         SUM(f.mtofactmoneda)  AS  VENCIDO_PENDIENTE
      from factura f 
INNER JOIN ACREENCIA A on f.idefact = a.idefact 
inner join oper_pol op  on f.ideop = op.numoper
inner join poliza p on op.idepol = p.idepol
inner join estr_punto_servicio eps on p.codpuntoservicio = eps.codpuntoservicio
INNER JOIN estr_agencia eag ON EPS.CODAGENCIA = EAG.CODAGENCIA
inner join estr_comercializadora eco on  eco.codcomercializadora = eag.codcomercializadora
inner join estr_territorio et On  et.codterritorio = eco.codterritorio
 LEFT JOIN BLOQUEO_PUNTOS_SERVICIO_PA BPS ON (BPS.CODPUNTOSERVICIO = P.CODPUNTOSERVICIO AND BPS.ACTIVO='ACT')
     where (((f.stsfact = 'INC'  AND f.fecvencfact < sysdate))  AND ET.CODDIVISION=12  AND a.tipoacre <> 'SAL'
       AND (A.SLDOACREMONEDA > 0) AND (ABS(F.MtoFactMoneda - F.SldoFactMoneda) <= 0)
       and ((TRUNC(SYSDATE) - TRUNC(f.fecvencfact)) > 0)
       AND ( f.fecvencfact  > (SYSDATE - 60) ) )
  GROUP BY eps.codpuntoservicio,  eps.descripcion, EPS.CODAGENCIA, BPS.ESTADO ;
/

  
CREATE OR REPLACE PUBLIC SYNONYM VW_PUNTOS_SERVICIO_AMERICA_MORA_EST FOR FICOHSA.VW_PUNTOS_SERVICIO_AMERICA_MORA_EST;


GRANT  SELECT ON FICOHSA.VW_PUNTOS_SERVICIO_AMERICA_MORA_EST TO ROL_ACSELX;


-- Confirmar los cambios
COMMIT;
