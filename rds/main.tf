provider "aws" {
  region = "us-east-1"
}

variable "db_password" {
  description = "Database password"
  sensitive = true
}

resource "aws_db_instance" "mydb" {
  allocated_storage = 10
  storage_type = "gp2"
  engine = "mysql"
  engine_version = "8.0"
  instance_class = "db.t3.micro"
  db_name = "mydatabase"
  username = "admin"
  password = var.db_password
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot = true
  publicly_accessible = true

  vpc_security_group_ids = [aws_security_group.db.id]

  tags = {
    Name = "my-database"
  }
}

resource "aws_security_group" "db" {
  name = "db-sg"
  description = "Security group for RDS DB"
  vpc_id = "vpc-04ed3497b12b3051b"
  
  ingress {
    from_port = 3306
    to_port = 3306
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"] //access in from any ip
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "db_password" {
  value = var.db_password
  sensitive = true
}