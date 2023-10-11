import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 50, nullable: false })
  username: string

  @Column({
    type: "varchar",
    length: 150,
    nullable: false,
    unique: true,
    transformer: {
      from: (data: string) => data.toLowerCase(),
      to: (data: string) => data.toLowerCase(),
    },
  })
  email: string

  @Column({ type: "text", nullable: false, select: false })
  password: string

  @Column({ type: "text", nullable: true })
  about: string

  @CreateDateColumn()
  createdAt: Date
}
