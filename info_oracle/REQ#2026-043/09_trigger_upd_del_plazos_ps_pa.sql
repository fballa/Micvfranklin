CREATE OR REPLACE TRIGGER FICOHSA.TRG_PLAZOS_PUNTOS_SERVICIO_PA
AFTER UPDATE OR DELETE ON FICOHSA.PLAZO_PUNTOS_SERVICIOS_PA
REFERENCING OLD AS OLD NEW AS NEW
FOR EACH ROW
DECLARE
        
        V_CODPUNTOSERVICIO NUMBER;
        V_MOTIVO VARCHAR2(100);
        
BEGIN
   
    -- UPDATE
    IF UPDATING THEN
      
       V_CODPUNTOSERVICIO := :NEW.CODSERVICIO;
       V_MOTIVO := 'Accion:UPDATE- PLAZO_PUNTOS_SERVICIOS_PA ';
      
        INSERT INTO HISTORICO_BLOQ_DESBLOQ_PS_PA (
                              cod_punto_servicio,
                              estado_anterior,
                              estado_nuevo,
                              motivo,
                              usuario_bd ,
                              HORA_ACCION,
                              ORIGEN
                              
                     )  VALUES (
                           V_CODPUNTOSERVICIO,
                           '-',
                           '-',
                           V_MOTIVO,
                           user,
                           to_char(SYSTIMESTAMP,'HH24:MI:SS'),
                           'TRIGGER_PLAZO'
                           
                    );      
    
    ELSIF DELETING THEN
        
        V_CODPUNTOSERVICIO := :OLD.CODSERVICIO;
        V_MOTIVO := 'Accion:DELETE- PLAZO_PUNTOS_SERVICIOS_PA ';
      
        INSERT INTO HISTORICO_BLOQ_DESBLOQ_PS_PA (
                              cod_punto_servicio,
                              estado_anterior,
                              estado_nuevo,
                              motivo,
                              usuario_bd ,
                              HORA_ACCION,
                              ORIGEN
                              
                     )  VALUES (
                           V_CODPUNTOSERVICIO,
                           '-',
                           '-',
                           V_MOTIVO,
                           user,
                           to_char(SYSTIMESTAMP,'HH24:MI:SS'),
                           'TRIGGER_PLAZO'
                           
                    );      
    
    END IF;
                 
              

END;
/


ALTER TRIGGER FICOHSA.TRG_PLAZOS_PUNTOS_SERVICIO_PA COMPILE;



commit;
