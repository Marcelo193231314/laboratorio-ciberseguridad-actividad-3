resource "aws_s3_bucket" "laboratorio" {
  bucket = "actividad3-seguro-local"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "laboratorio_cifrado" {
  bucket = aws_s3_bucket.laboratorio.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "laboratorio_bloqueo" {
  bucket = aws_s3_bucket.laboratorio.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
