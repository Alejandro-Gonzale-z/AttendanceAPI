provider "aws" {
  region = "us-east-1"
}

# IAM Role for Lambda
resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"  # Correct spelling of Version here
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}


data "archive_file" "lambda_zip" {
  type = "zip"
  //below you must replace it with the path to the nodejs app
  source_dir = "../app"
  output_path = "lambda_function_payload.zip"
}

resource "aws_lambda_function" "app_lambda" {
  function_name = "NodeApp"
  role = aws_iam_role.lambda_exec.arn
  handler = "app.handler"
  runtime = "nodejs20.x"
  filename = data.archive_file.lambda_zip.output_path

  source_code_hash = filebase64sha256(data.archive_file.lambda_zip.output_path)

  environment {
    variables = {
      NODE_ENV = "production"
      DB_HOST = var.db_host
      DB_USER = var.db_user
      DB_PASSWORD = var.db_password
      DB_NAME = var.db_name   
    }
  }

  vpc_config {
    subnet_ids = ["subnet-07d16ca568ad0836a", "subnet-00d004c14af1ee285"]
    security_group_ids = ["sg-06a8ed029cf90f1c5"]
  }


}

resource "aws_apigatewayv2_api" "api_gw" {
  name = "my-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id = aws_apigatewayv2_api.api_gw.id
  integration_type = "AWS_PROXY"
  integration_uri = aws_lambda_function.app_lambda.invoke_arn
  integration_method = "POST"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "api_route" {
  api_id = aws_apigatewayv2_api.api_gw.id
  route_key = "$default"
  target = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "api_stage" {
  api_id = aws_apigatewayv2_api.api_gw.id
  name = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "api_gateway_permission" {
  statement_id = "AllowAPIGatewayInvoke"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.app_lambda.function_name
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.api_gw.execution_arn}/*/*"
}

output "api_endpoint" {
  value = aws_apigatewayv2_stage.api_stage.invoke_url
}
