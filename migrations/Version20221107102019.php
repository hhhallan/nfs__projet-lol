<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221107102019 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE champion (id INT AUTO_INCREMENT NOT NULL, champion_id VARCHAR(20) NOT NULL, name VARCHAR(120) NOT NULL, image VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE game (id INT AUTO_INCREMENT NOT NULL, content LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', match_id VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE game_timeline (id INT AUTO_INCREMENT NOT NULL, content LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', match_id VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE summoner (id INT AUTO_INCREMENT NOT NULL, puuid VARCHAR(255) NOT NULL, summoner_level INT NOT NULL, account_id VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, profile_icon_id INT NOT NULL, revision_date INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE champion');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE game_timeline');
        $this->addSql('DROP TABLE summoner');
    }
}
