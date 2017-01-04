#!/bin/sh

aws s3 sync dist s3://${S3_BUCKET} --region=${REGION} --delete