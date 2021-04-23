import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'

export class CreateConnections1619197489793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'connections',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true },
        { name: 'admin_id', type: 'uuid', isNullable: true },
        { name: 'user_id', type: 'uuid' },
        { name: 'socket_id', type: 'varchar' },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
        { name: 'updated_at', type: 'timestamp', default: 'now()' }
      ]
    })
    await queryRunner.createTable(table)
    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        name: 'FK_Connection_Users',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('connections', 'FK_Connection_Users')
    await queryRunner.dropTable('connections')
  }
}
