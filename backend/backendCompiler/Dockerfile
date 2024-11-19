# Use the official AWS Lambda Python 3.11 image as the base image
FROM public.ecr.aws/lambda/python:3.11

# Install Node.js, Mono, and other necessary tools
RUN yum update -y && \
    yum install -y \
        gcc-c++ \
        java-1.8.0-openjdk-devel \
        curl \
        gnupg2 \
        lsb-release

# Add Mono repository and install Mono
RUN curl https://download.mono-project.com/repo/xamarin.gpg -o /etc/pki/rpm-gpg/RPM-GPG-KEY-mono && \
    rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-mono && \
    curl -s https://download.mono-project.com/repo/centos7-stable.repo -o /etc/yum.repos.d/mono-centos7-stable.repo && \
    yum install -y mono-devel

RUN curl -fsSL https://rpm.nodesource.com/setup_16.x | bash - && \
    yum install -y nodejs


# Install Development Tools group
RUN yum groupinstall "Development Tools" -y

# Clean up yum cache to reduce image size
RUN yum clean all

# Copy Python dependencies file (requirements.txt) and install Python dependencies
COPY requirements.txt ${LAMBDA_TASK_ROOT}
RUN pip install --no-cache-dir -r ${LAMBDA_TASK_ROOT}/requirements.txt

# Copy your main function code into the container (e.g., lambda_function.py)
COPY lambda_function.py ${LAMBDA_TASK_ROOT}

# Set the command to run the Lambda function handler
CMD ["lambda_function.handler"]
