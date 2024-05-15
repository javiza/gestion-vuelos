import { Injectable } from '@angular/core';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } 
from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Destinos } from '../modelo/destinos';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite:SQLiteConnection = SQLiteConnection(CapacitorSQLite)
  private db!:SQLiteDBConnection
  platform:string = "";
  iniciado:boolean = false

  //base de datos
  private readonly DB_NAME = "vuelos_destinos"
  private readonly DB_VERSION = 1
  private readonly DB_ENCRYPTION = false
  private readonly DB_MODE = "no-encryption"
  private readonly DB_READ_ONLY = false

  private readonly DB_TABLE_NAME = "destinos"
  private readonly DB_COL_ID = "id"
  private readonly DB_COL_NAME = "name"
  private readonly DB_COL_CITY = "city"
  private readonly DB_COL_IMAGE  = "image"
  private readonly DB_COL_VALOR = "valor"

  private readonly DB_SQL_TABLES = `
  CREATE TABLE IF NOT EXISTS ${this.DB_TABLE_NAME}(
    ${this.DB_COL_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${this.DB_COL_NAME} TEXT NOT NULL,
    ${this.DB_COL_CITY} TEXT NOT NULL,
    ${this.DB_COL_IMAGE} TEXT NOT NULL,
    ${this.DB_COL_VALOR} INTEGER DEFAULT 0,
  );
  `
  constructor (){}

  async iniciarPlugin(){
    try {
      console.log("DatabaseService::iniciarPlugin")
      this.platform = Capacitor.getPlatform()

      console.log("DatabaseService::iniciarPlugin plataform="+this.platform)
      if(this.platform == "web"){
        await customElements.whenDefined('jeep-sqlite')
        const jeepSqliteE1 = document.querySelector('jeep-sqlite')
        if(jeepSqliteE1 != null ){
          console.log("DatabaseService::iniciarPlugin::initWebStore")
          await this.sqlite.initWebStore()
        }
      }
      console.log("sqlite::createConnection()")
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRYPTION,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
      console.dir(this.db)

      console.log("deb.open()")
      const ret = await this.sqlite.checkConnectionsConsistency()
      const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result;
      if(ret.result && isConn) {
        this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY);
      }else {
        this.db = await this.sqlite.createConnection(this.DB_NAME, this.DB_ENCRYPTION, this .DB_MODE,
          this.DB_VERSION, this.DB_READ_ONLY);
      }
      await this.db.open()
      console.dir(this.db)

      await this.db.execute(this.DB_SQL_TABLES)
      await this.insertarValor({
        name: "nombre",
        city: "city",
        image: "imagen",
        valor: 0
      })
      if(this.platform == "web") {
        await this.sqlite.saveToStore(this.DB_NAME)

      }
      this.iniciado = true
    } catch(e) {
      console.error(e)
    }
   
  }
  async cerrarConexion(){
    await this.db.close()

  }
  async obtenerTodos():Promise<Destinos[]>{
    const sql = `SELECT * FROM ${this.DB_TABLE_NAME}`
    console.log(sql)
    console.dir(this.db)
    const resultado = (await this.db.query(sql)).values
    return resultado ?? []
  }
  async insertarValor(destino:Destinos){
    const sql = `INSERT INTO ${this.DB_TABLE_NAME} SET ${this.DB_COL_VALOR} = ? WHERE ${this.DB_COL_NAME} `
  }
  async eliminar(name:string){
    const sql = `DELETE FROM ${this.DB_TABLE_NAME} WHERE ${this.DB_COL_NAME} = ?`
    await this.db.run(sql, [name])
  }

}
