import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../shared/entity/base.entity';
import { Transform } from 'class-transformer';
import { Genre } from '../genre/genre.entity';
import { ProductionCompany } from './dto/production-company.output';
import { ProductionCountry } from './dto/production-country.output';
import { UserRating } from '../user-rating/user-rating.entity';

@ObjectType()
@Entity({
  name: 'movie',
})
export class Movie extends BaseEntity {
  @Field(() => Number)
  @PrimaryColumn({
    type: 'bigint',
  })
  id: number;

  @Field(() => String)
  @Column({
    name: 'imdb_id',
    nullable: true,
  })
  imdbId: string;

  @Field(() => String)
  @Column({
    name: 'original_language',
    length: 5,
    nullable: true,
  })
  originalLanguage: string;

  @Field(() => String)
  @Column({
    name: 'original_title',
    nullable: true,
  })
  originalTitle: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  overview: string;

  @Field(() => Number)
  @Transform(({ value }) => Number(value))
  @Column({
    name: 'popularity',
    type: 'decimal',
    precision: 10,
    default: 0,
  })
  popularity: number;

  @Field(() => String)
  @Column({
    name: 'poster_path',
    length: 100,
    nullable: true,
  })
  posterPath: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column({
    name: 'tag_line',
    nullable: true,
  })
  tagLine: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column({
    name: 'release_date',
    nullable: true,
  })
  releaseDate: string;

  @Field(() => Number)
  @Transform(({ value }) => Number(value))
  @Column({
    default: 0,
    nullable: true,
    type: 'decimal',
    precision: 10,
  })
  revenue: number;

  @Transform(({ value }) => Number(value))
  @Field(() => Number)
  @Column({
    default: 0,
    nullable: true,
    type: 'decimal',
    precision: 10,
  })
  budget: number;

  @Transform(({ value }) => Number(value))
  @Field(() => Number)
  @Column({
    default: 0,
    nullable: true,
    type: 'decimal',
    precision: 10,
  })
  runtime: number;

  @Field(() => Boolean)
  @Column({
    default: false,
  })
  adult: boolean;

  @Field(() => String)
  @Column({
    nullable: true,
  })
  status: string;

  @Field(() => String)
  @Column({
    nullable: true,
  })
  title: string;

  @Field(() => Boolean)
  @Column({
    default: false,
  })
  video: boolean;

  @Transform(({ value }) => Number(value))
  @Field(() => Number)
  @Column({
    name: 'vote_average',
    default: 0,
    type: 'decimal',
    precision: 10,
  })
  voteAverage: number;

  @Transform(({ value }) => Number(value))
  @Field(() => Number)
  @Column({
    default: 0,
  })
  voteCount: number;

  // genre is a jsonb column
  @Field(() => [Genre])
  @Column({
    type: 'jsonb',
    nullable: true,
  })
  genres: object[];

  @Field(() => [ProductionCompany], {
    nullable: true,
  })
  @Column({
    type: 'jsonb',
    nullable: true,
    name: 'production_companies',
  })
  productionCompanies: object[];

  @Field(() => [ProductionCountry], {
    nullable: true,
  })
  @Column({
    type: 'jsonb',
    nullable: true,
    name: 'production_countries',
  })
  productionCountries: object[];
}
